import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import Books from "./Books";
import Divisions from "./Divisions";
import Library from "./Library";

@Entity({ name: "users", synchronize: false })
class Users {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 255 })
	email!: string;

	@Column()
	password!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column()
	wpm!: number;

	@Column()
	divisionId!: number;

	@Column()
	score!: number;

	@Column({ type: "tinyint" })
	isAdmin!: number;

	@OneToMany((type) => Books, (book) => book.user)
	@JoinColumn({ name: "id" })
	books: Books[];

	@ManyToOne((type) => Divisions, (division) => division.id, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "divisionId" })
	division!: Divisions;

	@OneToMany(() => Library, (library) => library.user)
	library: Library[];
}

export default Users;
