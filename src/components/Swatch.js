export default function Swatch(props) {

  const { hexCode, handleSwatchClick } = props
  return (
    <>
    <div onClick={handleSwatchClick} className="swatch-container">
      <div className="swatch-color" style={{background: hexCode}}></div>
      <p>{hexCode}</p>
    </div>
    </>
  )
}