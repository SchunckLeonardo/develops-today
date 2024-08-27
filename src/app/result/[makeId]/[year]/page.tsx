import { VehicleTypesResponse } from '@/components/form-component'
import { Loading } from '@/components/loading'
import Link from 'next/link'
import { Suspense } from 'react'

interface ResultProps {
  params: {
    makeId: string
    year: string
  }
}

interface ResultData {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

interface FetchDataResponse {
  Count: number
  Results: ResultData[]
}

interface GetMakeNameResponse {
  Results: VehicleTypesResponse[]
}

export async function generateStaticParams() {
  return [{ makeId: '440' }, { year: '2015' }]
}

async function fetchVehicleData({
  params,
}: ResultProps): Promise<FetchDataResponse> {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${params.makeId}/modelyear/${params.year}?format=json`,
  )

  return response.status === 200
    ? response.json()
    : {
        Count: 0,
        Results: [],
      }
}

async function getMakeName(makeId: string) {
  const response = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
  )
  const data: GetMakeNameResponse = await response.json()

  const isVehicleExists = data.Results.find(
    (vehicle) => vehicle.MakeId === parseInt(makeId),
  )

  if (isVehicleExists) {
    return isVehicleExists.MakeName
  }
}

export default async function Result({ params }: ResultProps) {
  const vehicleData = await fetchVehicleData({ params })
  const makeName = await getMakeName(params.makeId)

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-start gap-10 px-5 py-10">
      <div className="flex w-3/4 items-start justify-between rounded-lg border border-zinc-400 p-3 shadow-md">
        <h2 className="text-4xl">{makeName}</h2>
        <h2 className="text-4xl">{params.year}</h2>
      </div>
      <p className="text-lg text-zinc-700">
        Founded {vehicleData.Count} results
      </p>
      <h4 className="text-xl">All models:</h4>
      <Suspense fallback={<Loading />}>
        <div className="flex w-full flex-col gap-3 rounded-lg border border-zinc-300 p-4 shadow-sm">
          {vehicleData.Results.length < 1 ? (
            <p className="text-center text-red-600">
              Any error happened, please, try again!
            </p>
          ) : (
            vehicleData.Results.map((car) => (
              <Link
                key={car.Model_ID}
                href={`https://google.com/search?q=${car.Make_Name}_${car.Model_Name}_${params.year}`}
                target="_blank"
                className="w-full"
              >
                <span className="block w-full rounded-md border border-zinc-500 p-2 text-blue-600 underline hover:text-blue-900">
                  {car.Model_Name}
                </span>
              </Link>
            ))
          )}
        </div>
      </Suspense>
    </main>
  )
}
