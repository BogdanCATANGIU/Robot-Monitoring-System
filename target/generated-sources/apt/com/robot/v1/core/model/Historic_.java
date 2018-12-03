package com.robot.v1.core.model;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Historic.class)
public abstract class Historic_ {

	public static volatile SingularAttribute<Historic, Date> date;
	public static volatile SingularAttribute<Historic, String> details;
	public static volatile SingularAttribute<Historic, Long> id;
	public static volatile SingularAttribute<Historic, User> user;
	public static volatile SingularAttribute<Historic, Long> userId;

}

