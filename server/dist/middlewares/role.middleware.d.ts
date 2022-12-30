import { Request } from "express";
export declare const roleMiddleware: (roles: Array<string>) => (req: Request, res: any, next: any) => void;
