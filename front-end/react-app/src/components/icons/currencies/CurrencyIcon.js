import { useState, useEffect } from "react";

const CurrencyIcon = ({ currencyCode }) => {
    const [importedComponent, setImportedComponent] = useState(null);
    
    useEffect(() => {
        const importComponent = async () => {
            const module = await import(`./${currencyCode}.js`);
            const Flag = module.default;
            setImportedComponent(<Flag w={19} h={17}/>);
        };
    
        importComponent();
      }, []);
    
      return (
        <div className="pl-2 ms-2.5">
          {importedComponent}
        </div>
      );
}

export default CurrencyIcon;