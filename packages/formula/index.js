import Formula from './src';
const formula=new Formula(document.getElementById('root'));

document.getElementById('btn').addEventListener('click',()=>{
    formula.toDataURL().then(res=>{
        const img=document.createElement('img');
        img.src=res;
        document.body.appendChild(img);
    });
});