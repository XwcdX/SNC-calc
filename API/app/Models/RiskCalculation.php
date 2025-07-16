<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskCalculation extends Model
{
    use HasFactory;

    // Add all the fields from your migration
    protected $fillable = [
        'client_id',
        'user_id',
        'luasRumah',
        'umurBangunan',
        'lokasiRumah',
        'materialBangunan',
        'riwayatRayap',
        'tingkatKelembaban',
        'jumlahPerabotKayu',
        'adaDanauSebelumnya',
        'jenisTanah',
        'skorRisiko',
        'kategoriRisiko',
        'estimasiKerugian',
        'rekomendasiLayanan',
        'selected_kecamatan_name',
        'selected_kecamatan_risk_level',
    ];

    public function validationRules(): array
    {
        return [
            'luasRumah' => 'required|numeric',
            'umurBangunan' => 'required|integer',
            'lokasiRumah' => 'required|string',
            'materialBangunan' => 'required|string',
            'riwayatRayap' => 'required|string',
            'tingkatKelembaban' => 'required|numeric',
            'jumlahPerabotKayu' => 'required|integer',
            'adaDanauSebelumnya' => 'required|string',
            'jenisTanah' => 'required|string',
            'skorRisiko' => 'required|integer',
            'kategoriRisiko' => 'required|string',
            'estimasiKerugian' => 'required|numeric',
            'rekomendasiLayanan' => 'required|string',
        ];
    }

    public function validationMessages(): array
    {
        return [];
    }

    public function relations(): array
    {
        return ['user', 'clients'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function inspection()
    {
        return $this->hasOne(Inspection::class);
    }
}
