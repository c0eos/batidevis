// @ts-nocheck
export default function Input({
  label, accessor, register, data, required, disabled,
}:{label:string, accessor?:string, register:any, data?:any, required?:boolean, disabled?:boolean}) {
  if (!data) {
    data = {};
  }
  if (!accessor) {
    accessor = label.toLowerCase();
  }

  return (
    <>
      <label htmlFor={accessor} className="block">{label}</label>
      <input
        {...register(accessor)}
        id={accessor}
        key={accessor}
        // defaultValue={data[accessor]}
        className="block w-full border-2 px-2 py-1"
        disabled={disabled}
      />
    </>
  );
}
