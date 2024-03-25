import aves from '../avesLearn/aves.js';
import Posts from './foroupload.model.js';
import axios from 'axios';


export async function createpost(req, res) {
  try {
    const post = req.body;
    const pajaro = await aves(post.urlPhoto);
    if(pajaro){
      post.isDisable=false;
    }else{
      post.isDisable=true;
    }
    //get endanger
    const redListResponse = await axios.get("https://birdblogun-d42wh7ajma-vp.a.run.app/suggestions/redlist/" + post.scientificName);
    post.inDanger=redListResponse.data;
    const postup = new Posts(post);
    const resultado = await postup.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
}


export async function getpost(req, res) {
  try {
    const posts = await Posts.find({ isDisable: false });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
}

export async function updatepost(req, res) {
  try {
    const idpost = req.params.idpost;
    const resultado = await Posts.findByIdAndUpdate(idpost,{ $inc: { reportsCount: 1 } });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
}
