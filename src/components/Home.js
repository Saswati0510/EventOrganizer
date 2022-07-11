import Events from './Events'


export default function Home(props) {
  
  return (
    <div>
     <Events showAlert={props.showAlert}></Events>
    </div>
  )
}
