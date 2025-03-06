import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game/game.service';
import { Game } from '../shared/models/Game';

@Component({
  selector: 'app-gamepage',
  standalone: false,
  templateUrl: './gamepage.component.html',
  styleUrl: './gamepage.component.scss'
})
export class GamepageComponent implements OnInit{
  game: Game | undefined;
  gameId: number | undefined;
  favoriteGames: Game[] = [];
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {

    this.gameId = +this.route.snapshot.paramMap.get('id')!;
    this.game = this.gameService.getGameById(this.gameId);
  }
  
  addToFavorites(game: Game): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Avoid duplicates
    if (!favorites.some((fav: Game) => fav.id === game.id)) {
      favorites.push(game);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  removeFromFavorites(game: Game): void {
    this.gameService.removeFromFavorites(game);  // Remove from the service
    this.favoriteGames = this.gameService.getFavoriteGames();  // Update the local list
  }
}