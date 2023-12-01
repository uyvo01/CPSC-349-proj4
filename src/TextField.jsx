
export default function TextField({text,size}) {
  return (
      <>
      <p><input type="text" size={size} defaultValue ={text} className="text"></input></p>
      </>
      
  );
}