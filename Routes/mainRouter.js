import express from "express";
import { sequelize } from "../sequelize.js";
import { User } from "./../Models/user.js";
import { TransportBy } from "./../Models/transportBy.js";
import { Agglomeration } from "./../Models/agglomeration.js";
import { Satisfaction } from "./../Models/satisfaction.js";
import { Experience } from "./../Models/experience.js";

const router = express.Router();

// call POST on http://localhost:5001/data
router.post("/data", async (request, response, next) => {

    const obiectul_meu = request.body;
    
    try {

      console.log("obiect satisfacere", request.body.satisfaction);

      for(let s of request.body.satisfaction)
      {
        const satisfaction = await Satisfaction.create(s);
        await satisfaction.save();
      }

      for(let a of obiectul_meu.agglomeration)
      {
        const agglomeration = await Agglomeration.create(a);
        await agglomeration.save();
      }

      for(let t of obiectul_meu.transportBy)
      {
        const transportBy = await TransportBy.create(t);
        await transportBy.save();
      }

      for(let u of obiectul_meu.user)
      {
        const user = await User.create(u);
        await user.save();
      }

      for(let e of obiectul_meu.experience)
      {
        const experience = await Experience.create(e);
        await experience.save();
      }
      
      response.sendStatus(204);

    } catch (error) {
        response.sendStatus(400).json({
            "error": error.message
        });
    }
  });

  export { router as mainRouter };