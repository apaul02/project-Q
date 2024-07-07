"use  client" 

export function TextInput({
  placeholder,
  onChange,
  label
}:{
  placeholder : string,
  onChange: (value: string) => void,
  label: string
}) {
  return <div className="pt-2">
  <label className="block mb-2 text-sm font-medium text-gray-900">{label} </label>
  <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => {onChange(e.target.value)}} placeholder={placeholder} required />
</div>
}

export function PasswordInput({
  placeholder,
  onChange,
  label
}:{
  placeholder : string,
  onChange: (value: string) => void,
  label: string
}) {
  return <div className="pt-2">
  <label className="block mb-2 text-sm font-medium text-gray-900">{label} </label>
  <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => {onChange(e.target.value)}} placeholder={placeholder} required />
</div>
}