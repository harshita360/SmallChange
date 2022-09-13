import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';

import { PortfolioPageComponent } from './portfolio-page.component';

describe('PortfolioPageComponent', () => {
  let component: PortfolioPageComponent;
  let fixture: ComponentFixture<PortfolioPageComponent>;
  let MockPortfolioService:any=null;
  const mockportfolio=[
    {
      "portfolio_id": 2222,
      "user_id" : 1,
      "portfolio_category":"BROKERAGE",
      "portfolio_name":"Demo portfolio",
      "stocks":[ 
          { "id":1, "instrumentId": 28738384, "instrument_codename":"APL", "quantity":450, "value":89000, "price":776,"change":-4.07},
          { "id":2, "instrumentId": 87738384, "instrument_codename":"APL","quantity":450, "value":89000, "price":776, "change":10.99}
      ],
      "portfolio_balance":100000}
  ]

  MockPortfolioService=jasmine.createSpyObj('PortfolioService',['getPortfolioData']);
  MockPortfolioService.getPortfolioData.and.returnValue(of(mockportfolio));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioPageComponent ],
      providers:[{provide:PortfolioService, useValue:MockPortfolioService}],
    })
    .compileComponents();
    fixture = TestBed.createComponent(PortfolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect portfolio text', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h2').textContent) // Testing the contentof h1 tag
.toContain('Portfolio');
});
});


