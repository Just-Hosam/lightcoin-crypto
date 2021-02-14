class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (const elem of this.transactions) {
      sum += elem.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed === true) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log(this.isAllowed);
    }
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  get isAllowed() {
    if (this.amount > 10000) {
      return 'You are depositing over $10,000. Permission denied.';
    }
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -(this.amount);
  }

  get isAllowed() {
    if (this.amount > this.account.balance) {
      return 'Insufficient funds!';
    }
    return true;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');
console.log(myAccount);

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
const t3 = new Withdrawal(80, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
