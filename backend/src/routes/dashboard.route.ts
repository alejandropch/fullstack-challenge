import { DashboardController } from "@root/controllers/dashboard.controller";
import { Router } from "express";

export const dashboardRoute = Router()
dashboardRoute.get("/products", DashboardController.getProducts)
dashboardRoute.post("/products", DashboardController.createProduct)
dashboardRoute.delete("/products/:id", DashboardController.deleteProduct)
dashboardRoute.put("/products/:id", DashboardController.updateProduct)