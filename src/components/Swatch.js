export default function Swatch(props) {

  const { hexCode } = props
  return (
    <>
    <div className="swatch-container">
      <div className="swatch-color" style={{background: hexCode}}></div>
      <p>{hexCode}</p>
    </div>
    </>
  )
}