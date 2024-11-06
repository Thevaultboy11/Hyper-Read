import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToMany,
} from "typeorm";
import Users from "./Users";

@Entity({ name: "time_count", synchronize: false })
class TimeCount {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	userId!: number;

	@Column()
	timeSpent!: number;

	@Column({ type: "timestamp" })
	timeDate!: Date;

	@OneToMany((type) => Users, (user) => user.id)
	@JoinColumn({ name: "id" })
	users: Users[];
}

export default TimeCount;
