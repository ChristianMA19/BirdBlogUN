import aves from '../avesLearn/aves.js';
import Posts from './foroupload.model.js';

export async function createpost(req, res) {
  try {
    const post = req.body;
    console.log(req.body);
    const pajaro = await aves(post.urlPhoto);
    if(pajaro){
      console.log('es un pajaro');
      post.isDisable=false;
    }else{
      console.log('no es un pajaro');
      post.isDisable=true;
    }
    console.log(post);
    const postup = new Posts(post);
    console.log(postup);
    const resultado = await postup.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
}