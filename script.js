//déclaration des variables

let todolist; //tableau qui contiendra la list des tâches

let tasksDom; //ciblage de la balise dans le DOM qui contiendra le tableau html des tâches

let isAdd = true; //si isAdd vaut true alors on est en mode ajout

let idTask; //contenir l'id de la tâche à mettre à jour
//déclaration des functions


/*
addTask aura pour but :
- d'ajouter un object tâche dans le tableau todolist
- @param {object}  task un object avec 2 propriétés (title et priority)
*/
function addTask(task) {
    /*
    pour démarrer le traitement de cette function, on a besoin d'un élèment extérieur
    l'object de la tâche, il est donc transmi en argument
    */
    //insérer cette tâche dans le tableau todolist
    todolist.push(task);    
}

/*
editTask aura pour but :
- de modifier la ligne dans todolist avec task
- @param {object}  task un object avec 2 propriétés (title et priority)
*/
function updateTask(task) {
    /*
    idTask : contient le rang de ligne à modifier
    todolist : le tableau contenant toutes les tâches
    task : qui contient les 2 propriétés à mettre à jour
    */
    todolist[idTask] = task;
    
}

/*
deleteTask aura pour but :
- de supprimer un object tâche dans le tableau todolist
- @param {int}  id, le rang de la tâche dans le tableau todolist
*/
function deleteTask(id) {
    todolist.splice(id, 1);
}

/*
editTask aura pour but :
- d'afficher le formulaire pré-rempli
- @param {int}  id, le rang de la tâche dans le tableau todolist
- @param {object}  form, le ciblage du formulaire
- @param {nodeList}  fields, la liste des ciblages des champs
*/
function editTask(id, form, fields) {
    //pré-remplir les champs
    //title
    //document.getElementById('title').value = todolist[id].title;
    
    //priority
    //document.getElementById('priority').value = todolist[id].priority;
    
    //refactorisation
    for (const field of fields) {
        field.value = todolist[id][field.name];
    }
    
    //set la valeur de l'id dans la variable global idTask
    idTask = id;
    
    //changer la legend du formulaire
    form.querySelector('legend').innerText = "Edition de la tâche";
    
    //afficher le formulaire
    form.classList.remove('hide');
}

/*
saveTasks aura pour but :
- de sauvegarder todolist dans localStorage
*/
function saveTasks() {
    window.localStorage.setItem("todolist",JSON.stringify(todolist));
}

/*
showAllTasks aura pour but :
- d'afficher la liste des tâches dans l'HTML
*/
function showAllTasks() {
    //utiliser innerHTML pour écrire le tableau des tâches dans l'HTML
    
    //variable contenant l'HTML à écrire
    let content = '';
    
    content +='<table class="table table-striped table-dark">';
    content +='<thead>';
    content +='<tr class="table-primary">';
    content +='<th>Titre</th>';
    content +='<th>Priorité</th>';
    content +='<th>Editer</th>';
    content +='<th>Supprimer</th>';
    content +='</tr>';
    content +='</thead>';
    content +='<tbody>';
        //début de boucle
        //parcourir le tableau todolist
        
        todolist.forEach(function(task,i) {
            //pour chaque ligne (qu'on nommera task) de mon tableau todolist
            content +='<tr>';
            content +='<td>' + task.title + '</td>';
            content +='<td>';
            switch (task.priority) {
                case "1":
                    // code
                    content +='Haute';
                    break;
                    
                case "2":
                    // code
                    content +='Normale';
                    break;
                    
                case "3":
                    // code
                    content +='Basse';
                    break;
            }
            content +='</td>';
            content +='<td><a href="#" class="edit btn btn-xs" data-id="' + i + '">✏️</a></td>';
            //rajouter un attribut qui contiendra la position de la ligne dans <a>
            //https://developer.mozilla.org/fr/docs/Apprendre/HTML/Comment/Utiliser_attributs_donnes
            content +='<td><a href="#" class="delete btn btn-xs" data-id="' + i + '">❌</a></td>';
            content +='</tr>';            
        });
            
            
            
       
        //fin de boucle
    content +='</tbody>';
    content +='</table>';    
    
    //écrire dans le DOM
    tasksDom.innerHTML = content;
}
//code principal
document.addEventListener('DOMContentLoaded', function() {
    //après vérification que le DOM est bien chargé, déclenchement du code principal
    //ciblage du bouton plus
    const btnPlus = document.getElementById('btnPlus');
    
    //ciblage du formulaire
    const formDom = document.getElementById('formTask');
    
    //ciblage des champs du formulaire
    const fieldsDom = formDom.querySelectorAll('.form-control');
    
    //ciblage de la div
    tasksDom = document.getElementById('listTasks');
    
    //init todolist
    /*
    si on a des données dans localstorage, on va les injecter dans todolist
    sinon on créé un tableau vide
    */
    todolist = JSON.parse(window.localStorage.getItem("todolist")) || [];
    
    

    //init de l'affichage des tâches
    showAllTasks();
    
    //ciblage des btn de suppression
    const listTasksDom = document.querySelector('#listTasks');
    
    listTasksDom.addEventListener('click', function(e) {
          e.preventDefault();
          
          //e.target est le ciblage de l'element sur lequel on a cliqué
  
          //on veut declencher le traitement du delete uniquement sur les balises a.delete
          if (e.target.classList.contains('delete')) {
             deleteTask(parseInt(e.target.dataset.id)); 
             
             //enregistrer todolist dans localstorage
             saveTasks();
             
             //rafraichir l'html
             showAllTasks();
          }
          
          //on veut declencher le traitement de l'édition uniquement sur les balises a.edit
          if (e.target.classList.contains('edit')) {
              /*
              quand je clique sur edit, je veux ouvrir le formulaire avec les champs
              pré-remplis
              
              quelle est notre donnée d'entrée ?
              e.target.dataset.id
              
              le rang de la tâche dans le tableau todolist
              todolist[e.target.dataset.id], j'aurais acces à ma tâche
              
              si je veux le title :
              todolist[e.target.dataset.id].title
              
              si je veux la priority
              todolist[e.target.dataset.id].priority
              */
              //mode ajout sur false
              isAdd = false;
             editTask(parseInt(e.target.dataset.id), formDom, fieldsDom); 
             

          }
        });
    
    
    
    //mettre en place un écouteur d'event sur le click 
    btnPlus.addEventListener('click', function() {
        //mode ajout
        isAdd = true;
        //reset legend form
        formDom.querySelector('legend').innerText = "Nouvelle tâche";
        //reset du formulaire
        formDom.reset();
        //quand on clique sur +, on le fait apparaitre
        formDom.classList.toggle('hide');
    });
    
    
    //ecouteur sur le submit du formulaire
    formDom.addEventListener('submit', function(e) {
        //stopper la propagation de l'event
        e.preventDefault();
        
        //object tache qui contiendra nos propriétés
        const myTask = {};
        
        //tester et récupérer les données du formulaire
        //parcourir fieldsDom
        for (const field of fieldsDom) {
            //console.log(field.name + " : " + field.value);
            
            //test si le champ n'est pas vide
            if (field.value == '') {
                console.log(field.name + " non rempli");
            }
            else {
                myTask[field.name] = field.value;
            }
        }
        
        //comment tester que myTask est exploitable
        //si myTask contient 2 propriétés, ça veut dire qu'il n'y pas eu d'erreur
        if (Object.keys(myTask).length == 2) {
            //la tache peut être sauvegardée
            //est-ce que je suis en mode ajout ou update ?
            
            //si ajout
            if (isAdd) {
               addTask(myTask); 
            }
            else {
               //sinon
            updateTask(myTask);
            /*
            déclarer et developper la fonction updateTask
            remarque : idTask contiendra le rang du tableau todolist de la tâche à mettre jour
            */
            }
            
            
            
            
            //sauvegarde todolist dans localStorage
            saveTasks();
            
            //reset du formulaire
            formDom.reset();
            
            //cacher le formulaire
            formDom.classList.add('hide');
            
            //mettre à jour la liste affichée
            showAllTasks();
        }
        else {
            console.log('on a au moins 1 erreur');
        }
    });
    
    


    

});






