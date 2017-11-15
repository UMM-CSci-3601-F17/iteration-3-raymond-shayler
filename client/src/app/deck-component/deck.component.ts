import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MdDialog, MatDialogConfig} from "@angular/material";


@Component({
    selector: 'app-deck',
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

    id: string;
    deck: Deck;
    editMode: boolean;
    newDeckTitle: String;


    constructor(public deckService: DeckService, private route: ActivatedRoute, public dialog: MdDialog) {
    this.editMode = false;

    }

    changeMode() {
        if (this.editMode == false) {
            this.editMode = true;
        } else {
            this.editMode = false;
        }
    }

    saveEdit() {
        this.deckService.updateName(this.newDeckTitle, this.deck._id);
        this.changeMode();
    }

    cancelEdit() {
        this.changeMode();
    }

    openAddDialog() {
        let config = new MatDialogConfig();
        config.data = {deckId: this.id};

        let dialogRef = this.dialog.open(NewCardDialogComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deck.cards.push(result);
            }
        });
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.deckService.getDeck(this.id).subscribe(
                deck => {
                    this.deck = deck;
                }
            );
        });
    }


}
