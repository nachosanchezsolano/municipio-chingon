import Link from 'next/link'

export default function Municipio() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Municipio de Valle Hermoso</h1>
      <p className="mb-4">Conoce más sobre nuestro municipio:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><Link href="/municipio/historia" className="text-blue-500 hover:underline">Historia</Link></li>
        <li><Link href="/municipio/autoridades" className="text-blue-500 hover:underline">Autoridades</Link></li>
        <li><Link href="/municipio/departamentos" className="text-blue-500 hover:underline">Departamentos</Link></li>
      </ul>
    </div>
  )
}

