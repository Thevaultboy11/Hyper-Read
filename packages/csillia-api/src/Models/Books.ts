import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	RelationId,
	OneToMany,
} from "typeorm";
import Users from "./Users";
import Library from "./Library";
@Entity({ name: "books", synchronize: false })
class Books {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@RelationId((books: Books) => books.user)
	userId!: number;

	@Column({ length: 255 })
	fileName!: string;

	@Column()
	size!: string;
	@Column()
	totalPages!: number;

	@Column()
	title!: string;

	@Column()
	currentPage!: number;

	@Column({ type: "tinyint" })
	isRead!: number;

	@Column()
	isReadDate!: Date;
	@Column()
	uploadedAt!: Date;

	@Column({ type: "tinyint" })
	public!: number;

	@Column({length: "255"})
	author!: string;

	@ManyToOne((type) => Users, (user) => user.id, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user!: Users;

	@OneToMany(() => Library, (library) => library.book)
	library: Library[];
}

export default Books;
