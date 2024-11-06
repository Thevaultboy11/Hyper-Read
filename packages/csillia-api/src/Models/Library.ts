import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import Users from "./Users";
import Books from "./Books";

@Entity({ name: "library", synchronize: false })
class Library {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	userId!: number;

	@Column()
	bookId!: number;

	@ManyToOne(() => Users, (user) => user.library)
	user!: Users;

	@ManyToOne(() => Books, (book) => book.library)
	book!: Books;
}

export default Library;
