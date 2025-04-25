import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  name: string;
  required?: boolean;
}

export default function CustomSelect({ label, value, onChange, options, name, required }: CustomSelectProps) {
  return (
    <div className="w-full">
      <label className="block text-white mb-2">{label}</label>
      <Listbox value={value} onChange={onChange} name={name} as="div">
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={
                `relative w-full cursor-pointer rounded bg-white/10 border border-white/20 py-2 px-4 pr-10 text-left text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition-colors` +
                (open ? ' ring-2 ring-[#FFCC00]' : '')
              }
            >
              <span className={value ? '' : 'text-gray-400'}>
                {options.find(opt => opt.value === value)?.label || options[0].label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown size={20} className="text-gray-300" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-[#181929]/95 py-1 text-base shadow-lg ring-1 ring-black/20 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={({ active, selected, disabled }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors ` +
                      (active ? 'bg-[#FFCC00]/10 text-yellow-300' : 'text-gray-100') +
                      (selected ? ' font-bold' : '') +
                      (disabled ? ' opacity-40 cursor-not-allowed' : '')
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={selected ? 'font-bold' : 'font-normal'}>
                          {option.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FFCC00]">
                            <Check size={18} aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
