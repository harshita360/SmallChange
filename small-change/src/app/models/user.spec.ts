import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('123-123-1289','dummy@gmail.com',new Date('1999-09-11'),'IN','560043','pass@#A','Dummy User')).toBeTruthy();
  });
});
