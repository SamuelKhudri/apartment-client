import { useEffect, useState } from "react";

const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading,setLoading] = useState(true);
   useEffect(() => {
      fetch('https://rocky-thicket-09241.herokuapp.com/allProperties')
         .then(res => res.json())
         .then(data => {
            setProperties(data);
            // console.log(data)
            setLoading(false)
         })
   }, []);

   return {
       properties,
       loading,
       setLoading
   }
}

export default useProperties;