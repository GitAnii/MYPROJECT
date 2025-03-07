import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game/game.service';
import { Game } from '../shared/models/Game';
import { AuthService } from '../services/auth.service';

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
  isLoggedIn:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService, 
    private router: Router 
  ) {}

  ngOnInit(): void {

    this.gameId = +this.route.snapshot.paramMap.get('id')!;
    this.game = this.gameService.getGameById(this.gameId);


    this.isLoggedIn = this.authService.isLoggedIn();
    
  }
  
  addToFavorites(game: Game): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']); ////ar mishvebs login pageze roca logout var
      return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!favorites.some((fav: Game) => fav.id === game.id)) {
      favorites.push(game);
      this.gameService.addToFavorites(game);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  removeFromFavorites(game: Game): void {
    this.gameService.removeFromFavorites(game); 
    this.favoriteGames = this.gameService.getFavoriteGames();  
  }
}