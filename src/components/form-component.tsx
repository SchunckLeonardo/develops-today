'use client'

import { useState, useEffect, FormEvent } from 'react'
import { SelectInput } from './select-input'
import { useRouter } from 'next/navigation'

export interface VehicleTypesResponse {
  MakeId: number
  MakeName: string
  VehicleTypeId: number
  VehicleTypeName: string
}

export function FormComponent() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypesResponse[]>([])
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState('')
  const [modelYearSelected, setModelYearSelected] = useState('')

  const router = useRouter()

  useEffect(() => {
    fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setVehicleTypes(data.Results)
      })
  }, [])

  function handleSubmitCarData(event: FormEvent) {
    event.preventDefault()
    router.push(`/result/${vehicleTypeSelected}/${modelYearSelected}`)
  }

  return (
    <form
      onSubmit={handleSubmitCarData}
      className="flex w-3/4 flex-col items-center justify-center gap-10"
    >
      <div className="flex w-full gap-5">
        <SelectInput
          onChange={(event) => setVehicleTypeSelected(event.target.value)}
          id="vehicle-type"
          placeholder_select="Vehicle type"
        >
          {vehicleTypes.map((vType) => (
            <option key={vType.MakeId} value={vType.MakeId}>
              {vType.MakeName}
            </option>
          ))}
        </SelectInput>
        <SelectInput
          id="model-year"
          placeholder_select="Model year"
          onChange={(event) => setModelYearSelected(event.target.value)}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <option key={i} value={2015 + i}>
                {2015 + i}
              </option>
            )
          })}
        </SelectInput>
      </div>
      <button
        disabled={vehicleTypeSelected === '' || modelYearSelected === ''}
        className="h-10 w-2/4 rounded-lg border border-gray-300 bg-cyan-800 text-white shadow-md transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:bg-cyan-800/50"
        type="submit"
      >
        Next
      </button>
    </form>
  )
}
