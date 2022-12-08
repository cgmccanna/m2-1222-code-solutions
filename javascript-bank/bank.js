/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if (balance > 0 && balance % 1 === 0) {
    var newAccount = new Account(this.nextAccountNumber, holder);
    this.accounts.push(newAccount);
    newAccount.deposit(balance);
    this.nextAccountNumber++;
    return newAccount.number;
  } else {
    return null;
  }
};

Bank.prototype.getAccount = function (number) {
  var foundAccount = null;
  for (var i = 0; i < this.accounts.length; i++) {
    if (this.accounts[i].number === number) {
      foundAccount = this.accounts[i];
    }
  }
  return foundAccount;
};

Bank.prototype.getTotalAssets = function () {
  if (this.accounts !== []) {
    var total = 0;
    for (var i = 0; i < this.accounts.length; i++) {
      total += this.accounts[i].getBalance();
    }
    return total;
  }
};
