import { GiDinosaurBones } from "react-icons/gi";

interface spinnerProps {
    size: number;
}


const DinoSpinner: React.FC<spinnerProps> = (TabProps: spinnerProps) => {
    return (
      <>

        <GiDinosaurBones className={`animate-spin-slow`} size={TabProps.size}    />
      </>
    );
  }
  
  export default DinoSpinner;