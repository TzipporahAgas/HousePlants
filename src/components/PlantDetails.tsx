import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
export default function PlantDetails(props: any) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div >
      <Dialog open={props.open} onClose={handleClose} dir={"rtl"}>
        <DialogTitle> plants {props.allDetails['Latin name']} details
        </DialogTitle>
        <DialogContent style={{ width: '550px', height: '650px', position: 'relative' }}>
          <h3>Categories:{props.allDetails['Categories']}</h3>
          <h3>Disease:{props.allDetails['Disease']}</h3>
          <h3>Use:</h3>
          {props.allDetails['Use'].map((e: any) =>
            <li>{e}</li>
          )}
          <h3>Latin name:{props.allDetails['Latin name']}</h3>
          <h3>Insects:</h3>

          {props.allDetails['Insects'].map((e: any) =>
            <li>{e}</li>
          )}
          <h3>Avaibility:{props.allDetails['Avaibility']}</h3>
          <h3>Disease:{props.allDetails['Disease']}</h3>
          <h3>Style:{props.allDetails['Style']}</h3>
          <h3>Bearing:{props.allDetails['Bearing']}</h3>
          <h3>Light tolered:{props.allDetails['Light tolered']}</h3>
          <h3>Height at purchase:</h3>
          <h3>Appeal:{props.allDetails['Appeal']}</h3>
          <img src={props.allDetails['Img']}></img>

          <h3>Growth:{props.allDetails['Growth']}</h3>
          <h3>Common name:{props.allDetails['Common name (fr.)']}</h3>
          <h3>Pruning:{props.allDetails['Pruning']}</h3>
          <h3>Family:{props.allDetails['Family']}</h3>
          <h3>Climat:{props.allDetails['Climat']}</h3>
          <h3>Color of leaf:{props.allDetails['Color of leaf'][0]}</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>

      </Dialog>

    </div>



  )
}