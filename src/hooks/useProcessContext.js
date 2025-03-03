import { useContext } from "react";
import ProcessContext from "../context/processes";

// Crear un hook para usar el contexto
const useProcessContext = () => useContext(ProcessContext);

export default useProcessContext;
