import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToMany,
} from "typeorm";
import Users from "./Users";

@Entity({ name: "login_count", synchronize: false })
class LoginCount {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	userId!: number;

	@Column()
	loginDate!: Date;

	@OneToMany((type) => Users, (user) => user.id)
	@JoinColumn({ name: "id" })
	users: Users[];
}

export default LoginCount;
