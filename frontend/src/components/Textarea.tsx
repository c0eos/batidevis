// @ts-nocheck

interface InputProps {
    label: string;
    accessor?: string;
    register?: any;
    data?: any;
    errors?: any;
    [rest:string]: any;
  }

export default function Textarea({
  label, accessor, register, data, errors, ...rest
}: InputProps) {
  if (!data) {
    data = {};
  }
  if (!accessor) {
    accessor = label.toLowerCase();
  }

  return (
    <>
      <label
        htmlFor={accessor}
        className="block"
      >
        {label}

      </label>

      {errors?.[accessor] && (
      <p
        className="text-red-600"
      >
        {errors[accessor]?.message}
      </p>
      )}

      <textarea
        {...register(accessor)}
        id={accessor}
        key={accessor}
        className="block w-full border-[1px] rounded-sm mb-4 last:mb-0 px-2 py-1 placeholder:text-sm placeholder:italic placeholder:text-stone-400 bg-stone-50 disabled:bg-stone-300"
        rows={3}
        {...rest}
      />

    </>
  );
}
