import type { Access } from "payload";

export const anyone: Access = () => true; 

export const signedIn: Access = ({ req }) => Boolean(req.user);
