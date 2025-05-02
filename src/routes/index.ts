import { Request, Response, Router } from "express";
import productController from "../controllers/product.controller";

const routes = Router();

routes.post("/api/products", productController.create);
routes.get("/api/products", (req: Request, res: Response) => {
  productController.findAll(req, res);
});
routes.get("/api/products/:id", productController.findOne);
routes.put("/api/products/:id", (req: Request, res: Response) => {
  productController.update(req, res);
});
routes.delete("/api/products/:id", productController.delete);
routes.get(/.*/, (_: Request, response: Response) => {
  response.status(404).send({
    error: "Not Found",
  });
});

export default routes;
