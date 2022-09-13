<<<<<<< HEAD
import { Order } from './order';
=======
>>>>>>> origin/nikhil
import { Trade } from './trade';

describe('Trade', () => {
  it('should create an instance', () => {
<<<<<<< HEAD
    let order:Order = new Order("",-1,-1,"","","");
    expect(new Trade("",-1,-1,"","",order,"",-1)).toBeTruthy();
=======
    expect(new Trade()).toBeTruthy();
>>>>>>> origin/nikhil
  });
});
