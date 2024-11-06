import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToMany,
} from "typeorm";
import Users from "./Users";

@Entity({ name: "divisions", synchronize: false })
class Divisions {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@OneToMany((type) => Users, (user) => user.id)
	@JoinColumn({ name: "id" })
	users: Users[];
}

export default Divisions;
