export default class NoteSAPI {
    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem("notesApp-notes") || "[]");
        return notes.sort((a,b) => new Date(a.updated) > new Date(b.updated)? -1: 1);
    }
    static saveNotes(NoteToSave) {
        const notes =  NoteSAPI.getAllNotes();
        const existing = notes.find(note => note.id == NoteToSave.id);
        // edit or updated
        if(existing) {
            existing.title = NoteToSave.title;
            existing.body = NoteToSave.body;
            existing.updated = new Date().toISOString();
        }else {
            
        NoteToSave.id = Math.floor(Math.random() * 1000000);
        NoteToSave.updated =  new Date().toISOString()
        notes.push(NoteToSave)
        }
        localStorage.setItem("notesApp-notes", JSON.stringify(notes));
    }

    static deleteNotes(id) {
        const notes =  NoteSAPI.getAllNotes();
        const newNotes =  notes.filter(note => note.id != id);
        localStorage.setItem("notesApp-notes", JSON.stringify(newNotes));
    }
}