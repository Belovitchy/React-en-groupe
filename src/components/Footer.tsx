import React from "react";

import Regles from "./Regles";
import APropos from "./APropos";

function Footer() {
  return (
    <footer className="flex justify-around items-center p-4 bg-amber-600 text-amber-100 fixed bottom-0 left-0 right-0">
		 {/* Section des règles */}
         <Regles />

         {/* Copyright centré */}
        <div className="text-amber-100 text-xl">
         &copy; {new Date().getFullYear()} <span className="font-semibold text-amber-400">Wilders</span>. Tous droits réservés.
        </div>

         {/* Section à propos */}  
         <APropos />
	</footer>	
  );
}

export default Footer;