
export interface Buttonprops{
    variant : "primary" | "secondary";
    size : "md" | "lg" | "sm";
    text : string;
    onClick : ()=>void;
    startIcon?: React.ReactNode;
    endIcon?:  React.ReactNode;
    fullwidth?: boolean;
    loading?:boolean;
}

const variantStyles ={
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-600"
}

const SizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm ro unded-sm",
}

const defaultStyles = " flex  items-center  rounded-md";

// export const Button =(props : Buttonprops)=>{

//     return <button className={ `${variantStyles[props.variant]} ${defaultStyles} ${SizeStyles[props.size]}` } >
//             <span> 
//                {props.startIcon && <span>{props.startIcon}</span>}
//             </span>
//             <div className = "pr-2 pl-2">
//                 {props.text}
//             </div>
//             <span> 
//                {props.endIcon && <span>{props.endIcon}</span>}
//             </span>

//     </button> 
// }
 
export const Button = (props: Buttonprops) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${defaultStyles} ${SizeStyles[props.size]} hover:bg-black transition-all duration-200 ${ props.fullwidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-75" : ""}`} disabled ={props.loading}
      onClick={props.onClick}
    >
      {props.startIcon && <span className="mr-2 flex items-center">{props.startIcon}</span>}
      <span className="whitespace-nowrap">{props.text}</span>
      {props.endIcon && <span className="ml-2 flex items-center">{props.endIcon}</span>}
    </button>
  );
};

