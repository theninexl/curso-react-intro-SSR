import express, {Express, Request, Response} from 'express';
import { config } from './config';
import { template } from './render/template';
import { render } from './render';
import axios from 'axios';

const app:Express = express();

app.use(express.static('dist'));

//hacer el fetch de galaxias desde el servidor en vez de el cliente
app.get('/galaxias', async(req:Request, res: Response) => {
  try {
    const { data } = await axios.get('https://images-api.nasa.gov/search?q=galaxies')

    const initialProps = {
      galaxies: data?.collection?.items
    }

    res.send(render(req.url, initialProps))

  } catch (error) {
    throw new Error("Error ocurred in /galaxias: ",error)
  }
})

app.get('*', (req: Request, res: Response) => {
  res.send(template(render(req.url)));
})

app.listen(config.PORT, () => {
  console.log(`listening in http://localhost:${config.PORT}`)
})