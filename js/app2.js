import NoteSAPI from "./notesAPI.js";
import NotesView from "./notesView.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers())
        this._refreshNotes()
    }
    _refreshNotes() {
        const notes = NoteSAPI.getAllNotes();
        this._setNotes(notes);
        if (notes.length > 0) this._setActiveNotes(notes[0])
    }
    _setNotes(notes) {
        this.notes = notes;
        this.view.updatedNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0)
    } 
    _setActiveNotes(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }
    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNotes = this.notes.find(note => note.id == noteId);
                this._setActiveNotes(selectedNotes)
            },
            onNoteAdd: () => {
                const newNotes = {
                    title: "new title",
                    body: "Take Notes..."
                };
                NoteSAPI.saveNotes(newNotes);
                this._refreshNotes()
            }
            ,
            onNoteEdit: (title, body) => {
                NoteSAPI.saveNotes({
                    id: this.activeNote.id,
                    title,
                    body
                });
                this._refreshNotes()
            }
            ,
            onNoteDelete: noteId => {
                NoteSAPI.deleteNotes(noteId)
                this._refreshNotes()
            }
        }
    }
}
