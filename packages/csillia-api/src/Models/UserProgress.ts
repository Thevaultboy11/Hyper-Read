import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import Users from "./Users";

@Entity({ name: "user_progress", synchronize: false })
class UserProgress {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	userId!: number;

	@Column()
	wpm!: number;

	@Column()
	wpmDate!: Date;

	@ManyToOne((type) => Users, (user) => user.id, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user!: Users;
}

export default UserProgress;
