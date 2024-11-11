import { useContext } from "react";
import PocketContext from "../Context/PocketContext";

const usePocketContext = () => {
  return useContext(PocketContext);
}

export default usePocketContext;
