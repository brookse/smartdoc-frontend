interface UserFormProps {
  title: string;
  isShowing: boolean;
  name: string | undefined;
  zipcode: number | undefined;
  setName: (name: string) => void;
  setZipcode: (zip: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete?: () => void;
  error?: string;
}

export const UserForm = ({ title, isShowing, name, zipcode, setName, setZipcode, onSubmit, onCancel, onDelete, error }: UserFormProps) => {  
  return (
    <div className={`transition-all duration-300 ease-in-out ${isShowing ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
      <h2>{title}</h2>
      <div className="flex flex-col gap-4">
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
        <input type="text" placeholder="Zipcode" value={zipcode} minLength={5} maxLength={5} onChange={(event) => setZipcode(Number(event.target.value))} />
        
        { error && <div><span className="text-red-400">(!)</span> {error}</div> }

        <div className={`flex gap-4 ${onDelete ? 'justify-between' : 'justify-end'}`}>
          { onDelete && <button className="border border-red-400 hover:border-red-200 rounded-full h-8 px-4 text-red-400 hover:text-red-200" onClick={onDelete}>Delete</button> }
          <div className="flex gap-4 justify-end">
            <button className="bg-cyan-400 hover:bg-cyan-200 rounded-full h-8 px-4 text-stone-800" onClick={onSubmit}>Save</button>
            <button className="border border-cyan-400 hover:border-cyan-200 rounded-full h-8 px-4 text-cyan-400 hover:text-cyan-200" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};