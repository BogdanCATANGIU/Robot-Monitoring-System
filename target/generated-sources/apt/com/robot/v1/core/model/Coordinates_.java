package com.robot.v1.core.model;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Coordinates.class)
public abstract class Coordinates_ {

	public static volatile SingularAttribute<Coordinates, Historic> historic;
	public static volatile SingularAttribute<Coordinates, BigDecimal> dx;
	public static volatile SingularAttribute<Coordinates, BigDecimal> dy;
	public static volatile SingularAttribute<Coordinates, BigDecimal> dz;
	public static volatile SingularAttribute<Coordinates, Long> historicId;
	public static volatile SingularAttribute<Coordinates, Long> id;

}

