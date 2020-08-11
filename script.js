/* eslint-disable no-debugger, no-console, no-unused-vars */

//TODO : Make stuff unselectable
//TODO : Make paragraph for input text

let all_tags = ['IMP', 'TODAY', 'CLG', 'HOME', 'CP', 'DEV'];

let all_notes = [
    {title:'JS BOOTCAMP SUMMARY',
     tags:[1,5],
     text:'I have already made the todo app, now making notes app.',
    },
    {title:'CF Virtual Plan',
     tags:[0,4],
     text:'I need to give a virtual everyday at 8pm, and upsolve before the next virtual on next day. Also make a robust time table',
    },
    {title:'Training report index',
     tags:[0,2],
     text:'Make the full training report in 2hours max today itself depending on how many students have sent it. Maybe ask before making',
    },
];

let displayTags = true;
let displayText = true;
let darkMode = false;

let filter = {
    title:'',
    tag:'',
    text:'',
    option:'all',
};

//Remember to always reset values of filter to all null and or=false;
document.getElementById('filter_input_box').addEventListener('input',function(e){
    let str = e.target.value;
    if(str===''){
        filter.title = '';
        filter.tag = '';
        filter.text = '';
    }else if(filter.option==='all'){ 
        filter.title = str;
        filter.tag = str;
        filter.text = str;
    }else if(filter.option==='title'){
        filter.title = str;
    }else if(filter.option==='text'){
        filter.text = str;
    }else if(filter.option==='tag'){
        filter.tag = str;
    }
    renderNotes(all_notes,all_tags,filter);
});

document.getElementById('notes_filter_options').addEventListener('change',function(e){
    filter.option = e.target.value;
    renderNotes(all_notes,all_tags,filter);
});

const putToScreen = function(note, filter){
    if(filter.option==='title'){
        if(note.title.toLowerCase().includes(filter.title.toLowerCase()))
            return true;
        else
            return false;
    }else if(filter.option==='text'){
        if(note.text.toLowerCase().includes(filter.text.toLowerCase()))
            return true;
        else
            return false;
    }else if(filter.option==='tag'){
        let retv = false;
        note.tags.forEach(function(item){
            let t = all_tags[item];
            if(t.toLowerCase().includes(filter.tag.toLowerCase())){
                retv = true;
            }
        });
        if(retv) return true;
        return false;
    }else{
        if(note.title.toLowerCase().includes(filter.title.toLowerCase()))
            return true;
        if(note.text.toLowerCase().includes(filter.text.toLowerCase()))
            return true;
        let retv = false;
        note.tags.forEach(function(item){
            let t = all_tags[item];
            if(t.toLowerCase().includes(filter.tag.toLowerCase())){
                retv = true;
            }
        });
        if(retv) return true;
        return false;
    }
}

const renderNotes = function(all_notes,all_tags,filter){
    let notes_cont = document.getElementById('notes_container');
    notes_cont.innerHTML = '';
    document.getElementById('temp_note_add').hidden = true;

    all_notes.forEach(function(item,ind){
        if(putToScreen(item,filter)){

            let note = document.createElement('div');
            note.className = 'note';
            note.id = `note_${ind}`;

            let thickhrbar = document.createElement('hr');
            thickhrbar.className = 'thickhr';
            let thinhrbar = document.createElement('hr');
            note.appendChild(thickhrbar);
            note.appendChild(thinhrbar);

            let note_title = document.createElement('h2');
            note_title.className = 'note_title inline'
            note_title.textContent = item.title
            note.appendChild(note_title);

            let note_spacing = document.createElement('p');
            note_spacing.className = 'note_spacing inline';
            note_spacing.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
            note.appendChild(note_spacing);

            if(displayTags){
                let note_tags = document.createElement('div');
                note_tags.className = 'note_tags inline';
                note.appendChild(note_tags);

                item.tags.forEach(function(item_tag,index_tag){
                    let ind_tag = document.createElement('h6');
                    ind_tag.className = 'tag inline';
                    ind_tag.title = item_tag;
                    ind_tag.textContent = `[${all_tags[item_tag]}]`;
                    note_tags.appendChild(ind_tag);
                });
            }

            if(displayText){
                let note_text = document.createElement('p');
                note_text.className = 'note_text';
                note_text.textContent = item.text;
                note_text.style.whiteSpace = "pre-wrap";
                note.appendChild(note_text);
            }

            note.appendChild(document.createElement('br'));

            let edit_btn = document.createElement('button');
            edit_btn.className = 'note_edit '
            edit_btn.textContent = 'EDIT';
            edit_btn.title = `${ind}`;
            note.appendChild(edit_btn);

            note_spacing = document.createElement('p');
            note_spacing.className = 'note_spacing inline';
            note_spacing.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
            note.appendChild(note_spacing);

            let note_delete = document.createElement('button');
            note_delete.textContent = 'DELETE';
            note_delete.className = 'note_delete inline';
            note_delete.title = `${ind}`    
            note.appendChild(note_delete);
            note_delete.addEventListener('click',function(){
                all_notes.splice(ind,1);
                renderNotes(all_notes,all_tags,filter);
            });

            note.appendChild(thinhrbar);

            notes_cont.appendChild(note);
        }
    })

    if(darkMode){
        document.querySelector('body').bgColor = "black";
        document.querySelectorAll('.note_title').forEach(function(item){
            item.style.color = "white";});
        document.querySelectorAll('.note_text').forEach(function(item){
            item.style.color = "white";});
        document.querySelectorAll('.tag').forEach(function(item){
            item.style.color = "white";});
        document.querySelectorAll('.display_options_label').forEach(function(item){item.style.color = "white";});
    }else{
        document.querySelector('body').bgColor = "white";
        document.querySelectorAll('.display_options_label').forEach(function(item){item.style.color = "black";});
    }
}

renderNotes(all_notes,all_tags,filter);

document.getElementById('hide_tags_checkbox').addEventListener('change',function(e){
    displayTags = !e.target.checked;
    renderNotes(all_notes,all_tags,filter);
});

document.getElementById('hide_text_checkbox').addEventListener('change',function(e){
    displayText = !e.target.checked;
    renderNotes(all_notes,all_tags,filter);
});

document.getElementById('dark_mode').addEventListener('change',function(e){
    darkMode = e.target.checked;
    renderNotes(all_notes,all_tags,filter);
});

document.getElementById('notes_add').addEventListener('click',function(e){
    let div = document.getElementById('temp_note_add');
    div.hidden = false;
    document.getElementById('new_note_title').focus();
    div.style.backgroundColor = 'grey';
    const divBackToNormal = function(){div.style.backgroundColor = '';}
    window.setTimeout(divBackToNormal,500);
});

document.getElementById('new_note_form').addEventListener('submit',function(e){
    e.preventDefault();
    let new_note = {title:'',
                    tags:[],
                    text:'',};
    new_note.title = e.target.querySelector('#new_note_title').value;
    if(new_note.title!=''){
    new_note.text = e.target.querySelector('#new_note_text').value;

    e.target.querySelector('#new_note_tag').value.split(',').forEach(
        function(user_tag){
            let ind = -1;
            all_tags.forEach(function(og_tag,og_ind){
                if(og_tag===user_tag){
                    ind = og_ind;
                }
            });
            if(ind===-1){
                all_tags.push(user_tag);
                new_note.tags.push(all_tags.length-1);
            }else{
                new_note.tags.push(ind);
            }
        });
    //console.log(all_tags);
    //console.log(new_note);

    all_notes.push(new_note);

    renderNotes(all_notes,all_tags,filter);
    }
    e.target.querySelector('#new_note_title').value='';
    e.target.querySelector('#new_note_text').value='';
    e.target.querySelector('#new_note_tag').value='';
    document.getElementById('temp_note_add').hidden = true;
});

