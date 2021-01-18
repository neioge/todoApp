# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# ユーザの作成
user0 = User.create(name: 'Not Assigned');
user1 = User.create(name: 'User001');
user2 = User.create(name: 'User002');

# todoの作成
Todo.create(title: 'task001', work: '0001', due_date: Date.new(2020, 4, 30), user: user0);
Todo.create(title: 'task002', work: '0002', due_date: Date.new(2020, 4, 30), user: user1);
Todo.create(title: 'task003', work: '0003', due_date: Date.new(2020, 4, 30), user: user2);
Todo.create(title: 'task004', work: '0004', due_date: Date.new(2020, 4, 30), user: user1);
