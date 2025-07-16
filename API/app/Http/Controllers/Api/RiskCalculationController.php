<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\RiskCalculation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RiskCalculationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $riskCalculationModel = new RiskCalculation();
        $calculatorRules = $riskCalculationModel->validationRules();
        $prefixedCalculatorRules = [];
        foreach ($calculatorRules as $field => $rules) {
            $prefixedCalculatorRules['calculatorResult.' . $field] = $rules;
        }

        $otherRules = [
            'client.id' => 'nullable|exists:clients,id',
            'client.name' => 'required|string|max:255',
            'kecamatan.name' => 'required|string|max:255',
            'kecamatan.riskLevel' => ['required', 'string', Rule::in(['rendah', 'sedang', 'tinggi'])],

            'inspection' => 'nullable|array',
            'inspection.dateTime' => 'required_with:inspection|string',

            'inspection.method' => 'required_with:inspection|string|max:255',
            'inspection.status' => 'required_with:inspection|string|max:255',
            'inspection.summary' => 'required_with:inspection|string',
            'inspection.recommendation' => 'required_with:inspection|string',

            'inspection.images' => 'nullable|array',
            'inspection.images.*.url' => 'required_with:inspection.images|string',
            'inspection.images.*.description' => 'nullable|string',
        ];

        $allRules = array_merge($prefixedCalculatorRules, $otherRules);

        $validator = Validator::make($request->all(), $allRules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            $clientData = $request->input('client');
            $calculatorResult = $request->input('calculatorResult');
            $kecamatanData = $request->input('kecamatan');
            $inspectionData = $request->input('inspection');

            $client = Client::firstOrCreate(
                ['name' => $clientData['name']]
            );

            $calculationData = array_merge(
                $calculatorResult,
                [
                    'client_id' => $client->id,
                    // 'user_id' => Auth::id(),
                    'selected_kecamatan_name' => $kecamatanData['name'],
                    'selected_kecamatan_risk_level' => $kecamatanData['riskLevel'],
                ]
            );
            $riskCalculation = RiskCalculation::create($calculationData);

            if ($inspectionData) {
                $inspection = $riskCalculation->inspection()->create([
                    'date_time' => $inspectionData['dateTime'],
                    'method' => $inspectionData['method'],
                    'status' => $inspectionData['status'],
                    'summary' => $inspectionData['summary'],
                    'recommendation' => $inspectionData['recommendation'],
                ]);

                if (!empty($inspectionData['images'])) {
                    $inspection->images()->createMany($inspectionData['images']);
                }
            }
            DB::commit();

            return response()->json([
                'message' => 'Risk calculation and inspection saved successfully!',
                'data' => $riskCalculation->load('client', 'inspection.images')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Failed to save risk calculation: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected error occurred while saving the data. Please try again.'
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
