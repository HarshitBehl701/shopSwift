export interface ICorsOptionsType{
    methods: string;
    origin: (origin:string |  undefined, callback: (error:  Error |null,allow?:boolean)=>void)  => void;
    credentials: boolean;
    allowedHeaders?:  string[];
    exposedHeaders?:  string[];
    optionsSuccessStatus?: number;
  }